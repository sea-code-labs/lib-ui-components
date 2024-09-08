#!/bin/sh

# Fetch the latest changes from origin and clean up stale references
git fetch origin --prune
# Pull the latest changes from the current branch
git pull origin

# Get the name of the currently active branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Remove stale local branches that no longer exist on the remote
# List branches with information about their remote status, then filter for branches marked as gone
git branch -vv | awk '/: gone]/ {print $1}' | while read branch; do
    # Check if the branch is not the currently active branch
    if [ "$branch" != "$current_branch" ]; then
        # Delete the stale branch
        git branch -d "$branch"
    fi
done

# Get the list of local branches excluding 'main' and 'develop'
git branch --format '%(refname:short)' | grep -v '^main$' | grep -v '^develop$' | while read branch; do
    # Skip the currently active branch
    if [ "$branch" = "$current_branch" ]; then
        continue
    fi

    # Check if the remote branch exists
    if ! git branch -r | grep -q "origin/$branch"; then
        # Force delete the branch if it does not exist on the remote and might not be fully merged
        git branch -D "$branch" || echo "Failed to delete branch '$branch'. It might be not fully merged."
    fi
done
