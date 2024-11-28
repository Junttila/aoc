import gleam/list
import gleam/string
import simplifile

pub fn sol() -> Result(String, Nil) {
  let file = case simplifile.read(from: "./src/solutions/y2023/d1/input.txt") {
    Ok(file) -> file
    _ -> "No file found"
  }

  let lines = string.split(file, "\n")

  list.first(lines)
}
