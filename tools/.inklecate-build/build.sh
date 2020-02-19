#!/bin/sh
source_dir="$(git rev-parse --show-toplevel)"
build_dir="${source_dir}/tools/.inklecate-build"

flatpak-builder \
    --state-dir=$build_dir/.flatpak-builder \
    $build_dir/build-dir \
    $build_dir/inklecate-flatpak/com.inklestudios.inklecate.json \
    --force-clean
