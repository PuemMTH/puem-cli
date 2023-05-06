function getDate(input_int) {
    const date = new Date();
    let a = date.toLocaleDateString("th-TH", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return `ครั้งที่ ${input_int} (${a})`
}

export default getDate;