/// <reference types="@tiptap/extension-link" />
import { findParentNodeClosestToPos, posToDOMRect } from '@tiptap/core'
import { useMemo } from 'react'
import { type Except } from 'type-fest'
import {
	ControlledBubbleMenu,
	type ControlledBubbleMenuProps,
} from '#app/components/rich-editor/controlled-bubble-menu'
import {
	type LinkBubbleMenuHandlerStorage,
	LinkMenuState,
} from '#app/components/rich-editor/extensions/link-bubble-menu-handler'
import {
	EditLinkMenuContent,
	type EditLinkMenuContentProps,
} from '#app/components/rich-editor/link-bubble-menu/edit-link-menu-content'
import {
	ViewLinkMenuContent,
	type ViewLinkMenuContentProps,
} from '#app/components/rich-editor/link-bubble-menu/view-link-menu-content'
import { useRichTextEditorContext } from '#app/components/rich-editor/rich-text-editor-provider'

export interface LinkBubbleMenuProps
	extends Partial<
		Except<ControlledBubbleMenuProps, 'open' | 'editor' | 'children'>
	> {
	/**
	 * Override the default text content/labels in this interface. For any value
	 * that is omitted in this object, it falls back to the default content.
	 */
	labels?: ViewLinkMenuContentProps['labels'] &
		EditLinkMenuContentProps['labels']
}

/**
 * A component that renders a bubble menu when viewing, creating, or editing a
 * link. Requires the mui-tiptap LinkBubbleMenuHandler extension and Tiptap's
 * Link extension (@tiptap/extension-link, https://tiptap.dev/api/marks/link) to
 * both be included in your editor `extensions` array.
 *
 * Pairs well with the `<MenuButtonEditLink />` component.
 *
 * If you're using `RichTextEditor`, include this component via
 * `RichTextEditor`’s `children` render-prop. Otherwise, include the
 * `LinkBubbleMenu` as a child of the component where you call `useEditor` and
 * render your `RichTextField` or `RichTextContent`. (The bubble menu itself
 * will be positioned appropriately no matter where you put it in your React
 * tree, as long as it is re-rendered whenever the Tiptap `editor` forces an
 * update, which will happen if it's a child of the component using
 * `useEditor`).
 */
export function LinkBubbleMenu({
	labels,
	...controlledBubbleMenuProps
}: LinkBubbleMenuProps) {
	const editor = useRichTextEditorContext()

	const bubbleMenuAnchorEl = useMemo(
		() =>
			editor
				? {
						getBoundingClientRect: () => {
							const nearestAnchorParent = editor.isActive('table')
								? findParentNodeClosestToPos(
										editor.state.selection.$anchor,
										node => node.type.name === 'link',
									)
								: null
							console.log('nearestAnchorParent', nearestAnchorParent)
							if (nearestAnchorParent) {
								const wrapperDomNode = editor.view.nodeDOM(
									nearestAnchorParent.pos,
								) as HTMLElement | null | undefined

								const anchorDomNode = wrapperDomNode?.querySelector('a')
								if (anchorDomNode) {
									return anchorDomNode.getBoundingClientRect()
								}
							}

							const { ranges } = editor.state.selection
							const from = Math.min(...ranges.map(range => range.$from.pos))
							const to = Math.max(...ranges.map(range => range.$to.pos))
							return posToDOMRect(editor.view, from, to)
						},
					}
				: null,
		[editor],
	)

	if (!editor?.isEditable) {
		return null
	}

	if (!('linkBubbleMenuHandler' in editor.storage)) {
		throw new Error(
			'You must add the LinkBubbleMenuHandler extension to the useEditor `extensions` array in order to use this component!',
		)
	}
	const handlerStorage = editor.storage
		.linkBubbleMenuHandler as LinkBubbleMenuHandlerStorage

	// Update the menu step if the bubble menu state has changed
	const menuState = handlerStorage.state

	let linkMenuContent = null
	if (menuState === LinkMenuState.VIEW_LINK_DETAILS) {
		linkMenuContent = (
			<ViewLinkMenuContent
				editor={editor}
				onCancel={editor.commands.closeLinkBubbleMenu}
				onEdit={editor.commands.editLinkInBubbleMenu}
				onRemove={() => {
					// Remove the link and place the cursor at the end of the link (which
					// requires "focus" to take effect)
					editor
						.chain()
						.unsetLink()
						.setTextSelection(editor.state.selection.to)
						.focus()
						.run()
				}}
				labels={labels}
			/>
		)
	} else if (menuState === LinkMenuState.EDIT_LINK) {
		linkMenuContent = (
			<EditLinkMenuContent
				editor={editor}
				onCancel={editor.commands.closeLinkBubbleMenu}
				onSave={({ text, link }) => {
					editor
						.chain()
						// Make sure if we're updating a link, we update the link for the
						// full link "mark"
						.extendMarkRange('link')
						// Update the link href and its text content
						.insertContent({
							type: 'text',
							marks: [
								{
									type: 'link',
									attrs: {
										href: link,
									},
								},
							],
							text: text,
						})
						// Note that as of "@tiptap/extension-link" 2.0.0-beta.37 when
						// `autolink` is on (which we want), adding the link mark directly
						// via `insertContent` above wasn't sufficient for the link mark to
						// be applied (though specifying it above is still necessary), so we
						// insert the content there and call `setLink` separately here.
						// Unclear why this separate command is necessary, but it does the
						// trick.
						.setLink({
							href: link,
						})
						// Place the cursor at the end of the link (which requires "focus"
						// to take effect)
						.focus()
						.run()

					editor.commands.closeLinkBubbleMenu()
				}}
				labels={labels}
			/>
		)
	}

	return (
		<ControlledBubbleMenu
			editor={editor}
			open={menuState !== LinkMenuState.HIDDEN}
			anchorEl={bubbleMenuAnchorEl}
			{...handlerStorage.bubbleMenuOptions}
			{...controlledBubbleMenuProps}
		>
			{linkMenuContent}
		</ControlledBubbleMenu>
	)
}
