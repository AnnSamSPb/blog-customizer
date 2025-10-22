import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [currentStyles, setCurrentStyles] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentStyles.fontFamilyOption.value,
					'--font-size': currentStyles.fontSizeOption.value,
					'--font-color': currentStyles.fontColor.value,
					'--container-width': currentStyles.contentWidth.value,
					'--bg-color': currentStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentStyles={currentStyles}
				onStylesChange={setCurrentStyles}
			/>
			<Article />
		</main>
	);
};
