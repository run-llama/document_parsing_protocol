# Generate the RFC from source

Run these commands from the root of the repository. Requires Python
3.9 or newer.

## First-time setup

```sh
python3 -m venv .venv-protocol
. .venv-protocol/bin/activate
python -m pip install -r scripts/protocol-requirements.txt
```

## Edit and rebuild

Edit the Markdown rules under `protocol/`, then run:

```sh
. .venv-protocol/bin/activate
python scripts/sync-protocol.py
```

This checks the rules and image clearance, then rebuilds the RFC, convention
pages, and ChatGPT/Claude downloads together. `pnpm protocol:build` runs the same
command if you use pnpm.

| Output | Location |
| --- | --- |
| Website RFC, HTML | `public/protocol/rfc.html` |
| Website RFC, Markdown | `public/protocol/rfc.md` |
| Local preview with relative image links | `protocol/site/rfc.html` |
| Portable text-only reference and skills | `public/downloads/` |

Open `protocol/site/rfc.html` in a browser for a local preview. The files under
`public/protocol/` use website-relative image paths and should be viewed through
the running app at `/protocol/rfc.html`.

Commit the source edits and generated changes in `app/data/`, `resources/`, and
`public/`. Do not commit `protocol/site/` or the virtual environment. After
committing, `python scripts/sync-protocol.py --check` rebuilds and confirms the
published artifacts are unchanged. Building does not deploy the site.

## RFC builder only

To generate the intermediate RFC with its images and styles, without updating
the app's published artifacts:

```sh
python protocol/tools/build_site.py --public
```

The RFC assembly code is `protocol/tools/build_rfc.py`. After the command above
has copied assets and styles, you can rerun just that assembly step with:

```sh
python protocol/tools/build_rfc.py --public
```

For rule structure, stable IDs, examples, and skill blocks, see the
[authoring guide](../protocol/README.md).
