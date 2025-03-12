import { useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/components/arrow-button';
import { Button } from 'src/components/button';
import { Text } from 'src/components/text';
import { Select } from 'src/components/select';
import { RadioGroup } from 'src/components/radio-group';
import { Separator } from 'src/components/separator';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type PropsArticleParamsForm = {
	formOpen: boolean;
	onToggle?: () => void;
	onSubmit?: (params: ArticleStateType) => void;
	onReset?: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: PropsArticleParamsForm) => {
	const { formOpen, onToggle, onSubmit, onReset } = props;
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			setFormState((prevState) => ({
				...prevState,
				[field]: option,
			}));
		};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		onSubmit?.(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset?.(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={formOpen} onClick={() => onToggle?.()} />

			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: formOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						name='font-size'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
