export class HTMLUtil {
	static getHTMLElement(classOrNameOrID:string):HTMLElement[] {
		let result:HTMLElement[] = [];
		switch (classOrNameOrID.charAt(0)) {
			case "#":
				const elt = document.getElementById(classOrNameOrID.substring(1));
				if (elt) result.push(elt);
				break;
			case ".":
				Array.prototype.forEach.call(document.getElementsByClassName(classOrNameOrID.substring(1)), function(elt) {
					result.push(elt);
				});
				break;
			default:
				Array.prototype.forEach.call(document.getElementsByName(classOrNameOrID), function(elt) {
					result.push(elt);
				});
				break;
		}
		return result;
	}

	static setStyleProp(element:HTMLElement, prop:string, value:string|number) {
		element.style.setProperty(prop, value as string);
	}

	static setStylePropToMultiTarget(target:HTMLElement[], prop:string, value:string|number) {
		for (const elt of target) {
			elt.style.setProperty(prop, value as string);
		}
		return target;
	}

	static setTransformMatrix(element:HTMLElement, transform:string) {
		HTMLUtil.setStyleProp(element, "transform", transform);
	}

	static getStyle(element:HTMLElement):CSSStyleDeclaration {
		return window.getComputedStyle(element);
	}

	static getTransformMatrix(element:HTMLElement):string {
		const t:string = HTMLUtil.getStyle(element).transform;
		return t != "none" ? t : "matrix(1, 0, 0, 1, 0, 0)";
	}
}

export default HTMLUtil;