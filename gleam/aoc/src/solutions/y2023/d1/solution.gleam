import simplifile

pub fn sol() -> List(String) {
  case simplifile.read(from: "./src/solutions/y2023/d1/input.txt") {
    Ok(file) -> file
    _ -> "No file found"
  }

  // let sol1 = "0"

  // let sol2 = "0"

  ["0", "0"]
}
