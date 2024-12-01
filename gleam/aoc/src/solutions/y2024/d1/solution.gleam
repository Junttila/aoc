import gleam/dict
import gleam/int
import gleam/list
import gleam/string
import simplifile

pub fn sol() -> List(String) {
  let file = case simplifile.read(from: "./src/solutions/y2024/d1/input.txt") {
    Ok(file) -> file
    _ -> "No file found"
  }

  let lines = string.split(file, "\n")

  let assert [left, right, ..] =
    list.fold(lines, [[], []], fn(acc, line) {
      let assert [first, second, ..] =
        string.split(line, "   ")
        |> list.map(fn(value) -> Int {
          let assert Ok(i) = int.parse(value)
          i
        })
      let assert [l, r, ..] = acc
      [[first, ..l], [second, ..r]]
    })
    |> list.map(fn(l) { list.sort(l, int.compare) })

  let sol1 =
    list.map2(left, right, fn(l, r) { int.absolute_value(l - r) })
    |> int.sum()
    |> int.to_string()

  let appearances =
    list.fold(right, dict.new(), fn(d, elm) {
      dict.insert(
        d,
        elm,
        case dict.get(d, elm) {
          Ok(a) -> a
          _ -> 0
        }
          + 1,
      )
    })

  let sol2 =
    list.map(left, fn(l) {
      l
      * case appearances |> dict.get(l) {
        Ok(a) -> a
        _ -> 0
      }
    })
    |> int.sum()
    |> int.to_string()

  [sol1, sol2]
}

pub fn print_list(l: List(String)) {
  let assert [first, ..rest] = l
  "[\n"
  <> list.fold(rest, "\t" <> first <> "\n", fn(acc, str) {
    acc <> "\t" <> str <> "\n"
  })
  <> "]"
}
