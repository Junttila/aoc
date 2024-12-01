import gleam/list
import gleam/string
import simplifile

pub fn sol() -> List(String) {
  let file = case simplifile.read(from: "./src/solutions/y2023/d1/input.txt") {
    Ok(file) -> file
    _ -> "No file found"
  }

  let lines = string.split(file, "\n")

  let sol1 = "0"

  let sol2 = "0"
  [sol1, sol2]
}
