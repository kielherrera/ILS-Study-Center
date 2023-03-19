var months = [1,2,3,4,5,6,7,8,9,10,11,12];

var tutored_students = {
    x: months,
    y: [14,21,18,29,16,17,16,22,25,24,24],
    type: 'scatter',
    name: 'Tutored Students'
};

var playdate_students = {
    x: months,
    y: [10,9,13,14,16,11,16,22,18,12,13],
    type: 'scatter',
    name: 'Playdate Students'
};

var students_enrolled = [tutored_students,playdate_students]
var layout = {
    title: 'Students Enrolled in 2022',
    xaxis:{
        title: 'Month'
    },
    yaxis:{
        title:'Students Enrolled'
    }
}

Plotly.newPlot('graph_container', students_enrolled ,layout);
