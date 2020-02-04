/**
 * Separator Block Styles.
 *
 * This file exports all of the styles for the separator block.
 *
 * @package   CXL
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

let labels = cxlUIEditor.labels;

export default {
	name  : 'core/separator',
	styles : [
		{
			name  : 'dashed',
			label : labels.borderDashed
		},
		{
			name  : 'double',
			label : labels.borderDouble
		}
	]
};
