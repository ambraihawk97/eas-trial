import * as Sudoku from "sudoku";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

type Board = (number | null)[];

interface GameState {
  given: Board;
  board: Board;
  solved: number[];
}

function newGame(): GameState {
  const puzzle = Sudoku.makepuzzle();
  const solved = Sudoku.solvepuzzle(puzzle) ?? [];
  return { given: puzzle.slice(), board: puzzle.slice(), solved };
}

export default function Index() {
  const { width } = useWindowDimensions();
  const [game, setGame] = useState<GameState>(newGame);

  const startNewGame = () => setGame(newGame());

  const isSolved =
    game.board.length === 81 &&
    game.board.every((value, index) => value === game.solved[index]);

  const onChangeCell = (index: number, text: string) => {
    const digit = text.replace(/\D/g, "").slice(0, 1);
    setGame((prev) => {
      const board = [...prev.board];
      board[index] = digit ? parseInt(digit, 10) : null;
      return { ...prev, board };
    });
  };

  const onSolvePuzzle = () =>
    setGame((prev) => ({ ...prev, board: prev.solved.slice() }));

  const boardSize = Math.min(width - 24, 368);
  const cellSize = boardSize / 9;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={startNewGame} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>New Game</Text>
        </Pressable>
        <Text style={styles.title}>Sudoku</Text>
        <Pressable onPress={onSolvePuzzle} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Solve</Text>
        </Pressable>
      </View>

      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        {Array.from({ length: 9 }, (_, row) => (
          <View key={row} style={[styles.row, row > 0 && boxRowBorder(row)]}>
            {Array.from({ length: 9 }, (_, col) => {
              const index = row * 9 + col;
              const value = game.board[index];
              const editable = game.given[index] === null;
              return (
                <View
                  key={col}
                  style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    col > 0 && boxColBorder(col),
                  ]}
                >
                  {editable ? (
                    <TextInput
                      style={styles.input}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={value != null ? String(value) : ""}
                      onChangeText={(text) => onChangeCell(index, text)}
                      selectTextOnFocus
                    />
                  ) : (
                    <Text style={styles.cellText}>{value}</Text>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {isSolved ? <Text style={styles.solvedText}>You solved it!</Text> : null}
    </View>
  );
}

function boxRowBorder(row: number) {
  return row === 3 || row === 6 ? styles.boxBorderHorizontal : styles.rowSeparator;
}

function boxColBorder(col: number) {
  return col === 3 || col === 6 ? styles.boxBorderVertical : styles.colSeparator;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 12,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#2f6fed",
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1c1c1e",
  },
  board: {
    borderWidth: 2,
    borderColor: "#1c1c1e",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  rowSeparator: {
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  boxBorderHorizontal: {
    borderTopWidth: 3,
    borderTopColor: "#1c1c1e",
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
  },
  colSeparator: {
    borderLeftWidth: 1,
    borderLeftColor: "#cccccc",
  },
  boxBorderVertical: {
    borderLeftWidth: 3,
    borderLeftColor: "#1c1c1e",
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 24,
    color: "#2f6fed",
    backgroundColor: "rgba(47, 111, 237, 0.08)",
    padding: 0,
  },
  cellText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1c1c1e",
  },
  solvedText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    color: "#1a9c48",
  },
});