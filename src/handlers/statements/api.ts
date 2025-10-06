const STATEMENT_FILE_CACHE: Map<string, File> = new Map();

export function addStatementFile(id: string, file: File) {
  STATEMENT_FILE_CACHE.set(id, file);
}

export function getStatementFile(id: string) {
  return STATEMENT_FILE_CACHE.get(id);
}
