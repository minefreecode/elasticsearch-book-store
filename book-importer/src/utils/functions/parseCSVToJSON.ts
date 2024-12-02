type ParsedRow = { [key: string]: string | string[] };

export function parseCVSToJSON(csv: string): ParsedRow[] {
  const rows = csv
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean);

  const headers = rows[0]
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((header) => header.trim());

  const data = rows.slice(1).map((row) => {
    const values = row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((value) =>
      value
        .trim()
        .replace(/(^")|("$)/g, "")
        .replace(/""/g, '"')
    );

    const obj: ParsedRow = {};
    headers.forEach((header, index) => {
      let value: string | string[] = values[index] || "";

      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((item) =>
            item
              .trim()
              .replace(/(^')|('$)/g, "")
              .replace(/""/g, '"')
          );
      }

      obj[header] = value;
    });

    return obj;
  });
  return data;
}
