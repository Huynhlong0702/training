import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
// const { RichText, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	InspectorControls,
	RichText, PlainText
} = wp.blockEditor;

const {
    PanelBody,
    TextareaControl,
} = wp.components;

registerBlockType('cgb/block-training', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('training - CGB Block'), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('training — CGB Block'),
		__('CGB Example'),
		__('create-guten-block'),
	],
	attributes: {
		title: {
		  source: 'text',
		  selector: '.card__title'
		},
		body: {
		  type: 'array',
		  source: 'children',
		  selector: '.card__body'
		},
	},

	edit: (props) => {

		const { attributes, className, setAttributes } = props;
	  
		return ([
			<InspectorControls>
				<PanelBody title={ 'Title' } initialOpen={ false }>
					<TextareaControl
						label="Title"
						value=""
					/>
				</PanelBody>

				<PanelBody title={ 'Content' } initialOpen={ false }>
					<TextareaControl
						label="Content"
						value=""
					/>
				</PanelBody>

			</InspectorControls>,
				
			<div className={className}>
				<div className="card">
					<PlainText
						onChange={ content => setAttributes({ title: content }) }
						value={ attributes.title }
						placeholder="Your card title"
						className="heading"
					/>
					<RichText
						onChange={ content => setAttributes({ body: content }) }
						value={ attributes.body }
						multiline="p"
						placeholder="Your card text"
						formattingControls={ ['bold', 'italic', 'underline'] }
						isSelected={ attributes.isSelected }
					/>
				</div>
			</div>
		]);
	},

	save: (props) => {
		const { attributes, className } = props;
		
		return (
			<div className={className}>
				<div className="card">
					<div className="card__content">
					<h3 className="card__title">{ attributes.title }</h3>
					<div className="card__body">
						{ attributes.body }
					</div>
					</div>
				</div>
			</div>
		);
	},

});       