function combinenDocuments(docs: any[]): string {
  return docs.map((doc: any) => doc.pageContent).join("\n\n");
}

export { combinenDocuments };
