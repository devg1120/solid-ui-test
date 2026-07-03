#!/usr/bin/env bash

set -euo pipefail

if [[ $# -ne 1 || ! "$1" =~ ^[1-9][0-9]*$ ]]; then
  echo "Usage: $0 <iterations>"
  exit 1
fi

iterations=$1

for ((i=1; i<=iterations; i++)); do
  echo "Iteration $i"
  echo "--------------------------------"
  result=$(OPENCODE_EXPERIMENTAL_PLAN_MODE=false opencode run \
    -m openai/gpt-5.3-codex \
    --variant high \
    -f plans/prd.json \
    -f progress.txt \
    -f plans/rules.md \
    -f plans/prompt.md)

  echo "$result"

  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "PRD complete, exiting."
    tt notify "CVM PRD complete after $i iterations"
    exit 0
  fi
done
