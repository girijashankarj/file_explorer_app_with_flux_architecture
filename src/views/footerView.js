class Footerview {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }

    render() {

        const createIconLink = (href, iconClass, tooltipText) => {

            const toolTip = document.createElement('span');
            toolTip.className = 'tooltiptext';
            const toolTipTextNode = document.createTextNode(tooltipText);
            toolTip.appendChild(toolTipTextNode);

            const link = document.createElement('a');
            link.classList.add('fa-icon');
            link.href = href;
            link.rel = 'noopener';
            link.target = '_blank';

            const icon = document.createElement('i');
            icon.classList.add('tooltip');
            iconClass.split(' ').forEach((iClass) => {
                icon.classList.add(iClass);

            });
            icon.appendChild(toolTip);
            link.appendChild(icon);
            return link;
        };

        const linkedinLink = createIconLink('https://www.linkedin.com', 'fab fa-linkedin', 'LinkedIn');
        const githubLink = createIconLink('https://www.github.com', 'fab fa-github', 'GitHub');
        const mediumLink = createIconLink('https://www.medium.com', 'fab fa-medium', 'Medium');

        const titleElement = document.createElement('div');
        titleElement.style.textAlign = 'right';
        titleElement.textContent = 'Javascript Flux Assignment';

        const socialIconsContainer = document.createElement('div');
        socialIconsContainer.classList.add('social-icons');
        socialIconsContainer.appendChild(linkedinLink);
        socialIconsContainer.appendChild(githubLink);
        socialIconsContainer.appendChild(mediumLink);

        const footerWrapper = document.createElement('div');
        footerWrapper.id = 'footerWrapper';
        footerWrapper.appendChild(titleElement);
        footerWrapper.appendChild(socialIconsContainer);

        this.element.appendChild(footerWrapper);
    }
}

export default Footerview;