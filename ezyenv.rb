class Ezyenv < Formula
  desc "Ezyenv - CLI for managing environments"
  homepage "https://github.com/broisnischal/ezyenv"
  version "1.0.0"
  url "https://github.com/broisnischal/ezyenv/releases/download/v1.0.0/ezyenv"
  sha256 "b99fa4da67400f7b73c55fe1d6b791b33f86b687a54dbc17a287bfd12e4046f0"

  def install
    bin.install "ezyenv"
  end

  test do
    system "#{bin}/ezyenv"
  end
end
