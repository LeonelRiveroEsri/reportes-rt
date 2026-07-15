#!/usr/bin/env python3
import argparse
import json
import os
import shutil
import sys
from pathlib import Path


def find_dist_widgets(client_dir):
    for candidate in (client_dir / "dist" / "widgets", client_dir / "dist-prod" / "widgets"):
        if candidate.exists():
            return candidate
    return None


def inject_token(widget_dir):
    config_path = widget_dir / "config.json"
    config = json.loads(config_path.read_text(encoding="utf-8-sig"))
    token = os.environ.get("EXB_FALLBACK_TOKEN", "").strip()
    if token:
        config["fallbackToken"] = token
    elif config.get("fallbackToken") == "__EXB_FALLBACK_TOKEN__":
        print("Aviso: EXB_FALLBACK_TOKEN no esta definido; se publica el placeholder.")
    config_path.write_text(
        json.dumps(config, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def main():
    parser = argparse.ArgumentParser(description="Empaqueta widgets EXB para Netlify")
    parser.add_argument("--client", default="client")
    parser.add_argument("--out", default="public")
    parser.add_argument("--widget", action="append")
    args = parser.parse_args()
    client_dir = Path(args.client).resolve()
    out_root = Path(args.out).resolve()
    out_widgets = out_root / "exb" / "widgets"
    dist_widgets = find_dist_widgets(client_dir)
    if not dist_widgets:
        sys.exit("No se encontro client/dist/widgets ni client/dist-prod/widgets")
    if out_root.exists():
        shutil.rmtree(out_root)
    out_widgets.mkdir(parents=True)
    selected = set(args.widget or [])
    copied = []
    for source in sorted(dist_widgets.iterdir()):
        if not source.is_dir() or not (source / "manifest.json").exists():
            continue
        if selected and source.name not in selected:
            continue
        target = out_widgets / source.name
        shutil.copytree(source, target)
        inject_token(target)
        copied.append(source.name)
    if not copied:
        sys.exit("No se copiaron widgets")
    (out_root / "_headers").write_text(
        "/exb/*\n  Access-Control-Allow-Origin: *\n"
        "  Cache-Control: public, max-age=300\n", encoding="utf-8"
    )
    links = "\n".join(
        f'<li><a href="exb/widgets/{name}/manifest.json">{name}</a></li>'
        for name in copied
    )
    (out_root / "index.html").write_text(
        '<!doctype html><meta charset="utf-8"><title>EXB widgets</title>'
        f"<h1>Widgets</h1><ul>{links}</ul>", encoding="utf-8"
    )
    print("Widgets publicados: " + ", ".join(copied))


if __name__ == "__main__":
    main()
