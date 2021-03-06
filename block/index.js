/**
 * @@pkg.title
 */

/**
 * External dependencies
 */
const { __ } = wp.i18n;
const { Toolbar, PanelBody, PanelColor, Dashicon, IconButton } = wp.components;
const InspectorControls = wp.blocks.InspectorControls;
const { RangeControl, ToggleControl, SelectControl } = InspectorControls;

const {
	registerBlockType,
	Editable,
	BlockControls,
	AlignmentToolbar,
	UrlInput,
	ColorPalette,
	source
} = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

const columnsOptions = [
	{ value: 1, label: __( 'One Column' ) },
	{ value: 2, label: __( 'Two Column' ) },
];

const blockAttributes = {
	title: {
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__title',
	},
	highlight: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--1 span.pricing-table__highlight-text',
	},
	features: {
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__features',
		default: [],
	},
	currency: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__currency',
	},
	amount: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__amount',
	},
	button: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__button',
	},
	url: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
		selector: '.pricing-table__item--1 .pricing-table__button',
	},
	title_2: {
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__title',
	},
	highlight_2: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--2 span.pricing-table__highlight-text',
	},
	features_2: {
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__features',
		default: [],
	},
	currency_2: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__currency',
	},
	amount_2: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__amount',
	},
	button_2: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__button',
	},
	url_2: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
		selector: '.pricing-table__item--2 .pricing-table__button',
	},
	layout: {
		type: 'string',
	},
	align: {
		type: 'string',
		default: 'center',
	},
	columns: {
		type: 'number',
		default: 2,
	},
	tableBackground: {
		type: 'string',
	},
	tableColor: {
		type: 'string',
	},
	buttonBackground: {
		type: 'string',
	},
	buttonColor: {
		type: 'string',
	},
	highlightBackground: {
		type: 'string',
		default: '#32373c',
	},
	highlightColor: {
		type: 'string',
	},
};

/**
 * Register Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'gutenkit/pricing-table', {
	title: __( 'Pricing Table' ),
	description: __( 'Easily create pricing tables.' ),
	icon: 'editor-table',
	category: 'common',
	keywords: [ __( 'pricing' ), __( 'table' ), __( 'plan' ) ],
	attributes: blockAttributes,

	getEditWrapperProps( attributes ) {
		const { layout } = attributes;
		if ( 'wide' === layout ) {
			return { 'data-align': layout };
		}
	},

	edit( { attributes, setAttributes, focus, setFocus, className } ) {

		const {
			title,
			highlight,
			features,
			currency,
			amount,
			button,
			url,
			title_2,
			highlight_2,
			features_2,
			currency_2,
			amount_2,
			button_2,
			url_2,
			align,
			layout,
			columns,
			tableBackground,
			tableColor,
			buttonBackground,
			buttonColor,
			highlightBackground,
			highlightColor
		} = attributes;

		const inspectorControls = focus && (
			<InspectorControls key="inspector">

				<PanelColor title={ __( 'Background Color' ) } colorValue={ tableBackground } initialOpen={ false }>
					<ColorPalette
						value={ tableBackground }
						onChange={ ( colorValue ) => setAttributes( { tableBackground: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ tableColor } initialOpen={ false }>
					<ColorPalette
						value={ tableColor }
						onChange={ ( colorValue ) => setAttributes( { tableColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Color' ) } colorValue={ buttonBackground } initialOpen={ false }>
					<ColorPalette
						value={ buttonBackground }
						onChange={ ( colorValue ) => setAttributes( { buttonBackground: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Background' ) } colorValue={ buttonColor } initialOpen={ false }>
					<ColorPalette
						value={ buttonColor }
						onChange={ ( colorValue ) => setAttributes( { buttonColor: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Highlight Color' ) } colorValue={ highlightBackground } initialOpen={ false }>
					<ColorPalette
						value={ highlightBackground }
						onChange={ ( colorValue ) => setAttributes( { highlightBackground: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Highlight Text Color' ) } colorValue={ highlightColor } initialOpen={ false }>
					<ColorPalette
						value={ highlightColor }
						onChange={ ( colorValue ) => setAttributes( { highlightColor: colorValue } ) }
					/>
				</PanelColor>

			</InspectorControls>
		);

		function onChangeAlignment( newAlignment ) {
			setAttributes( { align: newAlignment } );
		}

		function onChangeTitle( newTitle ) {
			setAttributes( { title: newTitle } );
		}

		function onChangeHighlight( newHighlight ) {
			setAttributes( { highlight: newHighlight } );
		}

		function onChangeCurrency( newCurrency ) {
			setAttributes( { currency: newCurrency } );
		}

		function onChangeAmount( newAmount ) {
			setAttributes( { amount: newAmount } );
		}

		function onChangeFeatures( newFeatures ) {
			setAttributes( { features: newFeatures } );
		}

		function onChangeButton( newButtonText ) {
			setAttributes( { button: newButtonText } );
		}

		function onChangeTitle_2( newTitle ) {
			setAttributes( { title_2: newTitle } );
		}

		function onChangeCurrency_2( newCurrency ) {
			setAttributes( { currency_2: newCurrency } );
		}

		function onChangeAmount_2( newAmount ) {
			setAttributes( { amount_2: newAmount } );
		}

		function onChangeFeatures_2( newFeatures ) {
			setAttributes( { features_2: newFeatures } );
		}

		function onChangeButton_2( newButtonText ) {
			setAttributes( { button_2: newButtonText } );
		}

		const icon_1_col = [
			<svg
			aria-hidden
			role="img"
			focusable="false"
			className="dashicon"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			>
			<g>
			<path d="M4.0263852,1.46689453 L15.9736148,1.46689453 C16.8651335,1.46689453 17.1884198,1.55972014 17.5143457,1.73402724 C17.8402716,1.90833433 18.0960602,2.1641229 18.2703673,2.49004883 C18.4446744,2.81597475 18.5375,3.13926099 18.5375,4.03077973 L18.5375,15.9692203 C18.5375,16.860739 18.4446744,17.1840252 18.2703673,17.5099512 C18.0960602,17.8358771 17.8402716,18.0916657 17.5143457,18.2659728 C17.1884198,18.4402799 16.8651335,18.5331055 15.9736148,18.5331055 L4.0263852,18.5331055 C3.13486646,18.5331055 2.81158022,18.4402799 2.4856543,18.2659728 C2.15972837,18.0916657 1.9039398,17.8358771 1.7296327,17.5099512 C1.55532561,17.1840252 1.4625,16.860739 1.4625,15.9692203 L1.4625,4.03077973 C1.4625,3.13926099 1.55532561,2.81597475 1.7296327,2.49004883 C1.9039398,2.1641229 2.15972837,1.90833433 2.4856543,1.73402724 C2.81158022,1.55972014 3.13486646,1.46689453 4.0263852,1.46689453 Z M11.6969621,15.0881899 L11.6969621,4.91181013 L9.60949956,4.91181013 C9.21437273,5.12055638 7.5369475,6.20901898 7.15673111,6.48486224 L7.15673111,8.43813073 C7.5071266,8.19210836 9.21437273,7.07382487 9.48276077,6.92472041 L9.56476822,6.92472041 L9.56476822,15.0881899 L11.6969621,15.0881899 Z" id="Combined-Shape"></path>
        		</g>
			</svg>
		]

		const icon_2_col = [
			<svg
			aria-hidden
			role="img"
			focusable="false"
			className="dashicon"
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			>
			<g>
			<path d="M4.0263852,1.46689453 L15.9736148,1.46689453 C16.8651335,1.46689453 17.1884198,1.55972014 17.5143457,1.73402724 C17.8402716,1.90833433 18.0960602,2.1641229 18.2703673,2.49004883 C18.4446744,2.81597475 18.5375,3.13926099 18.5375,4.03077973 L18.5375,15.9692203 C18.5375,16.860739 18.4446744,17.1840252 18.2703673,17.5099512 C18.0960602,17.8358771 17.8402716,18.0916657 17.5143457,18.2659728 C17.1884198,18.4402799 16.8651335,18.5331055 15.9736148,18.5331055 L4.0263852,18.5331055 C3.13486646,18.5331055 2.81158022,18.4402799 2.4856543,18.2659728 C2.15972837,18.0916657 1.9039398,17.8358771 1.7296327,17.5099512 C1.55532561,17.1840252 1.4625,16.860739 1.4625,15.9692203 L1.4625,4.03077973 C1.4625,3.13926099 1.55532561,2.81597475 1.7296327,2.49004883 C1.9039398,2.1641229 2.15972837,1.90833433 2.4856543,1.73402724 C2.81158022,1.55972014 3.13486646,1.46689453 4.0263852,1.46689453 Z M8.2769277,7.81815889 C8.2769277,7.79572074 8.26944832,7.73588566 8.26944832,7.69100935 C8.26944832,6.9281121 8.81544341,6.25496747 9.73540774,6.25496747 C10.5656194,6.25496747 11.1864084,6.82340072 11.1864084,7.6162155 C11.1864084,8.43894783 10.5880576,9.07469554 10.0495419,9.65060817 L6.36968458,13.5997233 L6.36968458,14.9385332 L13.5050177,14.9385332 L13.5050177,13.1958366 L9.30160342,13.1958366 L9.30160342,13.1285221 L11.5229807,10.6528457 C12.3905893,9.70296386 13.3255124,8.83535523 13.3255124,7.40679273 C13.3255124,5.77628684 11.9268675,4.53470897 9.78028405,4.53470897 C7.35696337,4.53470897 6.22757627,6.15025608 6.22757627,7.70596812 L6.22757627,7.81815889 L8.2769277,7.81815889 Z" id="Combined-Shape"></path>
			</g>
			</svg>
		]

		const layoutControls = [
			{
				icon: 'align-center',
				title: __( 'Default' ),
				onClick: () => setAttributes( { layout: 'default' } ),
				isActive: layout === 'default',
			},
			{
				icon: 'align-full-width',
				title: __( 'Full Width' ),
				onClick: () => setAttributes( { layout: 'wide' } ),
				isActive: layout === 'wide',
			},
		];

		const columnControls = [
			{
				icon: icon_1_col,
				title: __( 'One Column' ),
				onClick: () => setAttributes( { columns: 1 } ),
				isActive: columns === 1,
			},
			{
				icon: icon_2_col,
				title: __( 'Two Column' ),
				onClick: () => setAttributes( { columns: 2 } ),
				isActive: columns === 2,
			},
		];

		return [

			inspectorControls,
			focus && (
				<BlockControls key="controls">
					<Toolbar controls={ layoutControls } />
					<Toolbar controls={ columnControls } />
					<AlignmentToolbar
						value={ align }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
			),

			<div className={ className } >

				<style dangerouslySetInnerHTML={ { __html: '.editor-block-list__block[data-type="gutenkit/pricing-table"] .pricing-table__highlight { background-color: ' + highlightBackground + '; }' } } />

				<div className={ 'pricing-table pricing-table--' + columns + ' pricing-table--' + align } style={ { textAlign: align } }>

					<div className={ 'pricing-table__item pricing-table__item--1' } style={ { backgroundColor: tableBackground } }>

						{ ( ( highlight && highlight.length > 0 ) || !! focus ) && (
							<Editable
								tagName='span'
								value={ highlight }
								placeholder={ __( 'New' ) }
								style={ { color: highlightColor } }
								wrapperClassName={ highlight && highlight.length <= 0 ? 'pricing-table__highlight is-empty' : 'pricing-table__highlight' }
								className={ 'pricing-table__highlight-text' }
								onChange={
									( nextHighlight ) => setAttributes( {
										highlight: nextHighlight,
									} )
								}
								focus={ focus && focus.editable === 'highlight' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'highlight' } ) }
								keepPlaceholderOnFocus
							/>
						) }

						<Editable
							tagName="h4"
							multiline="false"
							className={ 'pricing-table__title' }
							onChange={ onChangeTitle }
							style={ { color: tableColor } }
							value={ title }
							placeholder={ __( 'Plan A' ) }
							focus={ focus && focus.editable === 'title' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'title' } ) }
							keepPlaceholderOnFocus
						/>

						<div className={ 'pricing-table__price' }>

							<Editable
								tagName='span'
								className={ 'pricing-table__currency' }
								onChange={ onChangeCurrency }
								style={ { color: tableColor } }
								value={ currency }
								placeholder={ __( '$' ) }
								focus={ focus && focus.editable === 'currency' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'currency' } ) }
								keepPlaceholderOnFocus
							/>

							<Editable
								tagName='h5'
								className={ 'pricing-table__amount gutenkit--header-font' }
								onChange={ onChangeAmount }
								style={ { color: tableColor } }
								value={ amount }
								placeholder={ __( '99' ) }
								focus={ focus && focus.editable === 'amount' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'amount' } ) }
								keepPlaceholderOnFocus
							/>

						</div>

						<Editable
							tagName='ul'
							multiline='li'
							className={ 'pricing-table__features' }
							onChange={ onChangeFeatures }
							value={ features }
							style={ { color: tableColor } }
							placeholder={ __( 'Add features' ) }
							focus={ focus && focus.editable === 'features' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'features' } ) }
							keepPlaceholderOnFocus
						/>

						{ ( ( button && button.length > 0 ) || !! focus ) && (
							<span key="button" className={ 'wp-block-button' } title={ button }>
								<Editable
									tagName='span'
									className="wp-block-button__link pricing-table__button"
									onChange={ onChangeButton }
									value={ button }
									placeholder={ __( 'Buy Now' ) }
									focus={ focus && focus.editable === 'button' ? focus : null }
									onFocus={ ( props ) => setFocus( { props, editable: 'button' } ) }
									style={ {
										backgroundColor: buttonBackground,
										color: buttonColor,
									} }
									keepPlaceholderOnFocus
									formattingControls={ [] }
								/>
							</span>
						) }

					</div>

				{ ( columns >= 2 ) && (

					<div className={ 'pricing-table__item pricing-table__item--2' } style={ { backgroundColor: tableBackground } }>

						{ ( ( highlight_2 && highlight_2.length > 0 ) || !! focus ) && (
							<Editable
								tagName='span'
								value={ highlight_2 }
								placeholder={ __( 'New' ) }
								wrapperClassName={ highlight_2 && highlight_2.length <= 0 ? 'pricing-table__highlight is-empty' : 'pricing-table__highlight' }
								className={ 'pricing-table__highlight-text' }
								onChange={
									( nextHighlight ) => setAttributes( {
										highlight_2: nextHighlight,
									} )
								}
								focus={ focus && focus.editable === 'highlight_2' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'highlight_2' } ) }
								keepPlaceholderOnFocus
							/>
						) }

						<Editable
							tagName="h4"
							multiline="false"
							className={ 'pricing-table__title' }
							onChange={ onChangeTitle_2 }
							style={ { color: tableColor } }
							value={ title_2 }
							placeholder={ __( 'Plan B' ) }
							focus={ focus && focus.editable === 'title_2' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'title_2' } ) }
							keepPlaceholderOnFocus
						/>

						<div className={ 'pricing-table__price' }>

							<Editable
								tagName='span'
								className={ 'pricing-table__currency' }
								onChange={ onChangeCurrency_2 }
								style={ { color: tableColor } }
								value={ currency_2 }
								placeholder={ __( '$' ) }
								focus={ focus && focus.editable === 'currency_2' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'currency_2' } ) }
								keepPlaceholderOnFocus
							/>

							<Editable
								tagName='h5'
								className={ 'pricing-table__amount gutenkit--header-font' }
								onChange={ onChangeAmount_2 }
								style={ { color: tableColor } }
								value={ amount_2 }
								placeholder={ __( '99' ) }
								focus={ focus && focus.editable === 'amount_2' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'amount_2' } ) }
								keepPlaceholderOnFocus
							/>

						</div>

						<Editable
							tagName='ul'
							multiline='li'
							className={ 'pricing-table__features' }
							onChange={ onChangeFeatures_2 }
							value={ features_2 }
							style={ { color: tableColor } }
							placeholder={ __( 'Add features' ) }
							focus={ focus && focus.editable === 'features_2' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'features_2' } ) }
							keepPlaceholderOnFocus
						/>

						{ ( ( button_2 && button_2.length > 0 ) || !! focus ) && (
							<span key="button" className={ 'wp-block-button' } title={ button_2 }>
								<Editable
									tagName='span'
									className="wp-block-button__link pricing-table__button"
									onChange={ onChangeButton_2 }
									value={ button_2 }
									placeholder={ __( 'Buy Now' ) }
									focus={ focus && focus.editable === 'button_2' ? focus : null }
									onFocus={ ( props ) => setFocus( { props, editable: 'button_2' } ) }
									style={ {
										backgroundColor: buttonBackground,
										color: buttonColor,
									} }
									keepPlaceholderOnFocus
									formattingControls={ [] }
								/>
							</span>
						) }

					</div>
				) }

				</div>

			</div>,
			focus && (
				<form
					key="form-link"
					className="blocks-button__inline-link blocks-button__inline-link--fullwidth"
					onSubmit={ ( event ) => event.preventDefault() }>
					<Dashicon icon="admin-links" />
					<UrlInput
						value={ url }
						onChange={ ( value ) => setAttributes( { url: value } ) }
					/>
					{ columns >= 2 &&
						<div className={ 'blocks-url-input blocks-button__inline-link--second' }>
							<Dashicon icon="admin-links" />
							<UrlInput
								value={ url_2 }
								onChange={ ( value ) => setAttributes( { url_2: value } ) }
							/>
						</div>
					}
					<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />

				</form>
			),
		];
	},

	save( { attributes, className } ) {

		const {
			title,
			highlight,
			features,
			currency,
			amount,
			button,
			url,
			title_2,
			highlight_2,
			features_2,
			currency_2,
			amount_2,
			button_2,
			url_2,
			align,
			layout,
			columns,
			tableBackground,
			tableColor,
			buttonBackground,
			buttonColor,
			highlightBackground,
			highlightColor
		} = attributes;

		const linkClass = 'wp-block-button__link';

		const buttonStyle = {
			backgroundColor: buttonBackground,
			color: buttonColor,
		};

		return (

			<div className={ className }>

				<div className={ 'pricing-table pricing-table--' + columns + ' pricing-table--' + align } style={ { textAlign: align } }>

					<div className={ 'pricing-table__item pricing-table__item--1' } style={ { backgroundColor: tableBackground } }>

						{ highlight && highlight.length > 0 && (
							<span className={ 'pricing-table__highlight' } style={ { backgroundColor: highlightBackground } }>
								<span className={ 'pricing-table__highlight-text' } style={ { color: highlightColor } }>
									{ highlight }
								</span>
							</span>
						) }

						{ title && title.length > 0 && (
							<h4 className={ 'pricing-table__title' } style={ { color: tableColor } } >{ title }</h4>
						) }

						<div className={ 'pricing-table__price' }>
							<span className={ 'pricing-table__currency' } style={ { color: tableColor } }>
								{ currency }
							</span>

							<h5 className={ 'pricing-table__amount gutenkit--header-font' } style={ { color: tableColor } }>
								{ amount }
							</h5>
						</div>

						<ul className={ 'pricing-table__features' } style={ { color: tableColor } }>
							{ features }
						</ul>

						{ button && button.length > 0 && (
							<span className={ 'wp-block-button' }>
								<a className={ linkClass + ' pricing-table__button' } href={ url } title={ button } style={ buttonStyle }>
									{ button }
								</a>
							</span>
						) }

					</div>

				{ columns >= 2 && (

					<div className={ 'pricing-table__item pricing-table__item--2' } style={ { backgroundColor: tableBackground } }>

						{ highlight_2 && highlight_2.length > 0 && (
							<span className={ 'pricing-table__highlight' } style={ { backgroundColor: highlightBackground } }>
								<span className={ 'pricing-table__highlight-text' } style={ { color: highlightColor } }>
									{ highlight_2 }
								</span>
							</span>
						) }

						{ title_2 && title_2.length > 0 && (
							<h4 className={ 'pricing-table__title' } style={ { color: tableColor } } >{ title_2 }</h4>
						) }

						<div className={ 'pricing-table__price' }>
							<span className={ 'pricing-table__currency' } style={ { color: tableColor } }>
								{ currency_2 }
							</span>

							<h5 className={ 'pricing-table__amount gutenkit--header-font' } style={ { color: tableColor } }>
								{ amount_2 }
							</h5>
						</div>

						<ul className={ 'pricing-table__features' } style={ { color: tableColor } }>
							{ features_2 }
						</ul>

						{ button_2 && button_2.length > 0 && (
							<span className={ 'wp-block-button' }>
								<a className={ linkClass + ' pricing-table__button' } href={ url_2 } title={ button_2 } style={ buttonStyle }>
									{ button_2 }
								</a>
							</span>
						) }
					</div>
				) }

				</div>

			</div>
		);
	},
} );
