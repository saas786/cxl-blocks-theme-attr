/**
 * Paragraph Block Styles.
 *
 * This file exports all of the styles for the paragraph block.
 *
 * @package   CXL
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

let labels = cxlUIEditor.labels;

export default {
	name  : 'core/paragraph',
	styles : [
		{
			name      : 'default',
			label     : labels.default,
			isDefault : true
		},
		{
			name  : 'highlight',
			label : labels.highlight
		}
	]
};
