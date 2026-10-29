# JALG Shopify theme: notes for Claude Code

This repository is the whole JALG Shopify theme (Motion 10.4.0, Archetype Themes). Theme folders sit at the repository root. `custom-liquid/` holds code the owner pastes into Custom Liquid blocks; it is not part of the theme upload. See `README.md` for the setup and commands.

## Rules

- Never publish a theme, and never push to the live (published) theme. Push to an unpublished theme (`shopify theme push --unpublished`, or `--theme <id>` of an unpublished one) and let the owner review and publish.
- Run `shopify theme check` before every push and fix new errors in files you changed.
- `config/settings_data.json`, `templates/*.json` and `sections/*-group.json` are edited in the theme editor. Pull them from Shopify before pushing, or push with `--ignore` for those paths, so editor changes are not overwritten. Do not hand-edit them unless asked.
- Push with `--nodelete` unless the owner asks otherwise.
- Prefer small changes in JALG files (`jalg-*`, `custom.css`) over editing Motion's own files, so theme updates stay easy. When a Motion file must change, add a short comment at the change.
- Keep text the shop owner sees editable in the theme editor (section/block settings) and translatable where the theme already uses locales.
- Write commit messages that say what changed on the store, in plain words.
