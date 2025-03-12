import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formState, setFormState] = useState(defaultArticleState);
	const [formOpen, setFormOpen] = useState(false);

	const toggleFormOpen = () => setFormOpen(!formOpen);
	const formSubmit = (props: ArticleStateType) => setFormState(props);
	const formReset = (props: ArticleStateType) => setFormState(props);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formState.fontFamilyOption.value,
					'--font-size': formState.fontSizeOption.value,
					'--font-color': formState.fontColor.value,
					'--container-width': formState.contentWidth.value,
					'--bg-color': formState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				formOpen={formOpen}
				onToggle={toggleFormOpen}
				onSubmit={formSubmit}
				onReset={formReset}
			/>
			<Article onClick={() => setFormOpen(false)} />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
