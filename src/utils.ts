
export let add = (inc,desc) => (arg => ({operation: 'add'+inc, description: desc, value: arg.value + inc}));

export let subtract = (inc,desc) => (arg => ({operation: 'subtract'+inc, description: desc, value: arg.value - inc}));

export let force = (val,desc) => (arg => ({operation: 'force', description: desc, forced: 'true', value: val}));

export let divide = (by,desc,down?) => (arg => ({operation: 'divide'+by, description: desc, value: Math[down ? 'floor' : 'ceil'](arg.value/by)}));

export let concat = (items,desc) => (arg => ({operation: 'concat', description: desc, value: arg.value.concat(items)}));
