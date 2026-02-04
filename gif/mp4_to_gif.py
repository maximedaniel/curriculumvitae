import argparse
import subprocess
import os
import sys


def run(cmd):
    print(" ".join(cmd))
    subprocess.run(cmd, check=True)


def main():
    parser = argparse.ArgumentParser(description="Convert part of a video to a GIF")
    parser.add_argument("input", help="Input MP4 file")
    parser.add_argument("start", help="Start time (e.g. 00:00:02.5)")
    parser.add_argument("end", help="End time (e.g. 00:00:07.0)")
    parser.add_argument("speed", type=float, help="GIF speed (1.0 = normal, 2.0 = 2x faster, 0.5 = half speed)")
    parser.add_argument("-o", "--output", default="output.gif", help="Output GIF filename")

    args = parser.parse_args()

    if not os.path.exists(args.input):
        print("Input file not found")
        sys.exit(1)

    palette = "palette.png"

    # Generate color palette for best quality
    run([
        "ffmpeg",
        "-y",
        "-ss", args.start,
        "-to", args.end,
        "-i", args.input,
        "-vf", "fps=15,scale=640:-1:flags=lanczos,palettegen",
        palette
    ])

    # Apply speed change (setpts)
    speed_filter = f"setpts={1/args.speed}*PTS"

    # Generate GIF
    run([
        "ffmpeg",
        "-y",
        "-ss", args.start,
        "-to", args.end,
        "-i", args.input,
        "-i", palette,
        "-filter_complex",
        f"[0:v]{speed_filter},fps=15,scale=640:-1:flags=lanczos[x];[x][1:v]paletteuse",
        args.output
    ])

    os.remove(palette)
    print(f"\nGIF created: {args.output}")


if __name__ == "__main__":
    main()
