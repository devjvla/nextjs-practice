'use client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react'

interface SubmitBtn {
	type: string;
	router?: AppRouterInstance
}

interface SubmitBtnProperties {
	text: string;
	btnClass: string;
	callback?: () => void;
	routerCallback?: (router: AppRouterInstance) => void
}

const SubmitBtnTypes: { [key: string]: SubmitBtnProperties } = {
	"ADD_TO_CART": {
		text: "Add to cart",
		btnClass: "btn-primary",
		callback: () => { alert("Add to cart") },
	},
	"CREATE_USER": {
		text: "Create new user",
		btnClass: "btn-outline btn-secondary",
		routerCallback: (router: AppRouterInstance) => { router.push("/users") },
	}
}

const SubmitBtn = ({ type, router }: SubmitBtn) => {
	const { text, btnClass, callback, routerCallback }: SubmitBtnProperties = SubmitBtnTypes[type];

	return (
		<button 
			className={`btn ${btnClass}`} 
			onClick={() => router ? routerCallback?.(router) : callback?.()}
		>
			{text}
		</button>
	)
}

export default SubmitBtn;