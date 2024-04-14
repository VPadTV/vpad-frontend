#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "dev" || "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;
else
  # Don't build
  echo "🛑 - Build cancelled"ls

  exit 0;
fi