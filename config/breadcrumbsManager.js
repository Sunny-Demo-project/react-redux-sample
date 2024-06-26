let breadcrumbs = localStorage.getItem('breadcrumbs');
export default function manage(breadcrumb, remove) {
    const { parse, stringify } = JSON;
    if(!breadcrumbs) {
        breadcrumbs = stringify([])
    }
    if(remove) {
        if(breadcrumb) {
            if(typeof breadcrumb === 'string') {
                let breadcrumbsArray = parse(breadcrumbs);
                const index = breadcrumbsArray.indexOf(breadcrumb);
                if(index >= 0) {
                    breadcrumbsArray.splice(index, 1);
                }
                breadcrumbs = stringify(breadcrumbsArray);
            }
        }
    } else {
        if(breadcrumb) {
            if(typeof breadcrumb === 'string') {
                let breadcrumbsArray = parse(breadcrumbs);
                if(breadcrumbsArray.indexOf(breadcrumb) < 0) {
                    breadcrumbsArray.push(breadcrumb);
                }
                breadcrumbs = stringify(breadcrumbsArray);
            }else if(Array.isArray(breadcrumb)) {
                breadcrumbs = stringify(breadcrumb);
            }
        }
    }
    localStorage.setItem('breadcrumbs', breadcrumbs);
    return parse(breadcrumbs);
}