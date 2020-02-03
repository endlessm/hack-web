#!/bin/sh
flatpak-builder --run build-dir com.hack_computer.Ink.json inklecate.sh $(realpath $1)
