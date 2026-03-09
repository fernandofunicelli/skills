interface SchemaScriptProps {
  schema: Record<string, any> | Record<string, any>[];
}

export function SchemaScript({ schema }: SchemaScriptProps) {
  const schemaString = JSON.stringify(schema, null, 0);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaString }}
    />
  );
}
