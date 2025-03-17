type ParsedRow = { [key: string]: string | string[] };

export function parseCVSToJSON(csv: string): ParsedRow[] {
  const rows = csv
    .split("\n")//Разделение
    .map((row) => row.trim()) //Цикл по элементам
    .filter(Boolean);//Фильтрация

  const headers = rows[0]
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((header) => header.trim());

  const data = rows.slice(1).map((row) => {
    const values = row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((value) =>
      value
        .trim()
        .replace(/(^")|("$)/g, "") //Замена с использованием регулярных выражений
        .replace(/""/g, '"')//Замена с использованием регулярных выражений
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
