#!/usr/bin/env python3
"""Compatibility entrypoint: rebuild local protocol sources, never a remote guide."""
from pathlib import Path
import runpy

if __name__ == '__main__':
    runpy.run_path(str(Path(__file__).with_name('sync-protocol.py')), run_name='__main__')
