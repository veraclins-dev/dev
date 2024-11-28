export const Z_INDEXES = {
	TABLE_ELEMENT: 1,
	// The menu bar must sit higher than the table components (like the
	// column-resize-handle and selectedCells) of the editor.
	MENU_BAR: 2,
	// The notched outline of the "outlined" field variant should be at the same z-index
	// as the menu-bar, so that it can contain/enclose it
	NOTCHED_OUTLINE: 2,
	// The bubble menus should appear on top of the menu bar
	BUBBLE_MENU: 3,
} as const
