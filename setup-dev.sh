#!/usr/bin/env bash

set -e

# install npm deps
npm install

# set up python venv
python -m venv .venv

# Activate environment
source .venv/bin/activate

# Install pip packages
python3 -m pip install -r requirements.txt
