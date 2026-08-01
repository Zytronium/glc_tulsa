"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { wrapFieldsWithMeta } from "tinacms";
import { client } from "@/../tina/__generated__/client";

function TagsAutocompleteInput({ input }: any) {
  const [allTags, setAllTags] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const value: string[] = Array.isArray(input.value) ? input.value : [];

  useEffect(() => {
    let cancelled = false;

    async function loadTags() {
      const result = await client.queries.eventConnection();
      const edges = result.data.eventConnection.edges ?? [];
      const tagSet = new Set<string>();

      for (const edge of edges) {
        const eventTags = edge?.node?.tags;
        if (Array.isArray(eventTags)) {
          for (const tag of eventTags) {
            if (tag) tagSet.add(tag);
          }
        }
      }

      if (!cancelled) setAllTags(Array.from(tagSet).sort());
    }

    loadTags().catch((err) => console.error("[tags-autocomplete] failed to load tags:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  const suggestions = allTags.filter(
    (tag) =>
      tag.toLowerCase().includes(draft.toLowerCase()) &&
      !value.includes(tag) &&
      draft.length > 0
  );

  function updateCoords() {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed || value.includes(trimmed)) return;
    input.onChange([...value, trimmed]);
    setDraft("");
    setShowSuggestions(false);
  }

  function removeTag(tag: string) {
    input.onChange(value.filter((t) => t !== tag));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setShowSuggestions(true);
            updateCoords();
          }}
          onFocus={() => {
            setShowSuggestions(true);
            updateCoords();
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addTag(draft);
            }
          }}
          placeholder="Type to add a tag..."
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />

        {showSuggestions &&
          suggestions.length > 0 &&
          typeof document !== "undefined" &&
          createPortal(
            <ul
              style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                width: coords.width,
                zIndex: 9999,
              }}
              className="max-h-48 overflow-auto rounded border border-gray-200 bg-white shadow-lg"
            >
              {suggestions.map((tag) => (
                <li key={tag}>
                  <button
                    type="button"
                    onMouseDown={() => addTag(tag)}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>,
            document.body
          )}
      </div>
    </div>
  );
}

export const TagsAutocomplete = wrapFieldsWithMeta(TagsAutocompleteInput);
