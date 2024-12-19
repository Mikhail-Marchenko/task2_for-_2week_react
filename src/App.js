import styles from './App.module.css';
import data from './data.json';
import React, { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const clickNext = () => {
		if (activeIndex < steps.length - 1) {
			setActiveIndex(activeIndex + 1);
		} else if (activeIndex === steps.length - 1) {
			setActiveIndex(0);
		}
	};
	const clickBack = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};
	const clickSteps = (stepIndex) => {
		setActiveIndex(stepIndex);
	};

	const renderSteps = () => {
		return steps.map((step, index) => (
			<li
				className={`${styles['steps-item']} ${index <= activeIndex ? styles.done : ''} ${index === activeIndex ? styles.active : ''} `}
				key={step.id}
			>
				<button
					className={styles['steps-item-button']}
					onClick={() => clickSteps(index)}
				>
					{index + 1}
				</button>
				<div className="content">{step.title}</div>
			</li>
		));
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>{renderSteps()}</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							disabled={activeIndex === 0}
							onClick={clickBack}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={clickNext}
						>
							{activeIndex === steps.length - 1
								? 'Начать сначала'
								: 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
