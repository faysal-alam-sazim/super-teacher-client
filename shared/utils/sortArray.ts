export const sortArray = <T>(
  array: T[],
  fieldToSort: keyof T,
  order: "asc" | "desc" = "asc",
): T[] =>
  array.sort((a, b) => {
    const fieldA = a[fieldToSort];
    const fieldB = b[fieldToSort];

    let valueA: number | string = fieldA as string | number;
    let valueB: number | string = fieldB as string | number;

    if (fieldA instanceof Date || !isNaN(Date.parse(fieldA as string))) {
      valueA = new Date(fieldA as string).getTime();
      valueB = new Date(fieldB as string).getTime();
    }

    if (valueA < valueB) {
      return order === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
