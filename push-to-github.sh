#!/usr/bin/env bash
# Meal Yield - Helper script to push commits to GitHub
# Usage:
#   bash push-to-github.sh <GITHUB_USERNAME> <GITHUB_PERSONAL_ACCESS_TOKEN> [REPO_NAME]
# Example:
#   bash push-to-github.sh myusername ghp_xxxxxxxxxxxx Meal-Yield-

set -e

USERNAME="$1"
TOKEN="$2"
REPO="${3:-Meal-Yield-}"

if [ -z "$USERNAME" ] || [ -z "$TOKEN" ]; then
  echo "Error: Missing username or token."
  echo "Usage: bash push-to-github.sh <GITHUB_USERNAME> <GITHUB_TOKEN> [REPO_NAME]"
  echo "Default repo name is 'Meal-Yield-' if omitted."
  exit 1
fi

echo "Configuring remote origin for https://github.com/${USERNAME}/${REPO}.git..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://${TOKEN}@github.com/${USERNAME}/${REPO}.git"

echo "Pushing branch 'main' to GitHub..."
git push -u origin main --force

echo "Successfully pushed Meal Yield to https://github.com/${USERNAME}/${REPO}!"
