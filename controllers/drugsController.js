exports.showTodayDrugList = (req,res) => {
    res.send('오늘의 약 목록'); //오늘의 복용약 목록 렌더링(res.render)
};
exports.showEntireDrugList = (req,res) => {
    res.send("전체 약 목록"); //전체 복용약 목록 렌더링
};
exports.showTodayDrugRecord = (req,res) => {
    res.send("오늘의 약 복용 기록"); //오늘의 복용약 기록 렌더링
};
exports.showDrugRecord = (req,res) => {
    res.send("약 기록"); //복용약 복용 시작 날짜, 처방 병원, 투여량 빈도 메모 등 기본적인 정보 렌더링
};

exports.showDrugInfo = (req,res) => {
    res.send("약 정보") //약 정보 렌더링
};