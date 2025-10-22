import { useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useClose } from 'src/hooks/useClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentStyles: ArticleStateType;
	onStylesChange: (styles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentStyles,
	onStylesChange,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(currentStyles);
	const sidebarRef = useRef<HTMLElement>(null);

	const handleOpen = () => {
		setFormState(currentStyles);
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	useClose({
		isOpen,
		onClose: handleClose,
		rootRef: sidebarRef,
	});

	const handleReset = () => {
		const resetState = defaultArticleState;
		setFormState(resetState);
		onStylesChange(resetState);
		handleClose();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onStylesChange(formState);
		handleClose();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleOpen} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<h2 className={styles.title}>Задайте параметры</h2>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
					/>

					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
					/>

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
