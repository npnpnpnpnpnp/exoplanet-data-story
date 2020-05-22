
{ pkgs ? import (fetchTarball http://nixos.org/channels/nixpkgs-18.09-darwin/nixexprs.tar.xz) {} }:

let
  nodejs = pkgs.nodejs-10_x;
  yarn = pkgs.yarn.override { inherit nodejs; };

in pkgs.mkShell rec {
  buildInputs = [
    nodejs
    yarn
  ];
}