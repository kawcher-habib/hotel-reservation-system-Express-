


function generatedEmployeeId(dom){
    const prefix = 'EMP';
    const domYear = dom.replace(/-/g, '');
    const randomNum = Math.round(Math.random() * 100);
    const empId = `${prefix}-${domYear + randomNum}`;
    return empId;
}

module.exports ={
    generatedEmployeeId
}