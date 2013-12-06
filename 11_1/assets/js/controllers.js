'use_strict';

angular.module('app.controllers', [])
.controller('PageCtrl', function($scope){
  //Variables
  $scope.activity_title = "Categorical Perceptions Based on Voice Onset Time"
  $scope.currentPage = 0;
  $scope.finished = false;
  $scope.questions = false;
  $scope.restart = false;
  $scope.pageCopy = [
    {
      copy: [
        { line: "In this demonstration, you'll be a participant in a simulated experiment demonstrating categorical perception of the phonemes <strong>/p/</strong> and <strong>/b/</strong>." },
        { line: "There will be a total of 35 trials. In each trial:" },
        { line: "1. You'll hear a single spoken syllable \"puh\" or \"buh\"." },
        { line: "2. Click PUH or BUH to indicate which syllable you perceived." },
        { line: "3. Press the space bar to start the next trial." }
      ]
    },
    {
      copy: [
        { line: "Click PUH or BUH to indicate which syllable you perceived." }
      ]
    },
    {
      copy: [
        { line: "<strong>Results</strong>" },
        { line: "The syllables you heard in this experiment were synthesized. All the initial consonants were identical and all the final vowels were identical, but the voice onset times varied. You heard 5 occurrences each of syllables with voice onset times of 0, 10, 20, 30, 40, 50, and 60 msec. The 7 data points in the graph below show the percentages of your “puh” and “buh” responses for each of these stimuli. The expected phonemic boundary between perception of the phoneme /b/ (in “buh”) and the phoneme /p/ (in “puh”) is the boundary at 26.8 msec, derived from the results of an actual experiment with these stimuli." },
        { line: "Categorical perception of /b/ vs. /p/ is revealed by a sharp transition from perceiving “buh” to perceiving “puh”—that is, a transition from a high percentage of “buh” responses to a high percentage of “puh” responses across a narrow range of voice onset times. If your results show such a transition, then you experienced an abrupt shift in perception between the two phonemes." }
      ]
    }
  ];
  $scope.currentPageCopy = $scope.pageCopy[0];

  //functions
  $scope.safeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };
  
  $scope.startPageClick = function(){
    if($scope.currentPage == 0 && !$scope.restart)
    {
      $scope.change(1, 'home')
    }else
    {
      $scope.restart = false;
    }
  } 
  //change page
  $scope.change= function($targetPage, $window) {
  
    
    if($targetPage==0 && $scope.currentPage == 0)
    {
      $scope.currentPage = $targetPage;
      $scope.restart = true;
      return;
    }
    if($window && !$scope.restart)
    {
      if($scope.currentPage == 0)
      {
        $scope.updateHeader($scope.currentPage);
        $scope.currentPage = $targetPage;
      }
      else
      {
        return false;
      }
    }
    else if (!$window && !$scope.restart)
    {
      $scope.currentPage = $targetPage;
    }
    
    if($scope.currentPage == 4)
    {
      $scope.questions = true;
    }
    $scope.safeApply();
  }
  
  //test finished
  $scope.setFinish = function(b){
    $scope.finished = b;
  }
  
  //next page
  $scope.nextPage= function(check){
    if(check == 'override')
    {
      if(!$scope.finished)
      {
        $scope.$broadcast("SHOW_WARNING",['next']);
        return false;
      }
    }
    else
    {
    
      if(!$scope.finished)
        $scope.currentPage++;
      else
        $scope.currentPage+=2;
      
      if($scope.currentPage == 4)
      {
        $scope.setFinish(true);
      }
      $scope.change($scope.currentPage);
    }
  }
  
  //previous page
  $scope.prevPage= function(){
    $scope.currentPage--;
    $scope.change($scope.currentPage);
  }
  
  //update the copy in the header
  $scope.updateHeader = function($index) {
    $scope.currentPageCopy = $scope.pageCopy[$index];
  }
  
  $scope.audioFiles =[
    {
      url: 'audio0',
      response: [],
      perc:0
    },
    {
      url: 'audio1',
      response: [],
      perc:0
    },
    {
      url: 'audio2',
      response: [],
      perc:0
    },
    {
      url: 'audio3',
      response: [],
      perc:0
    },
    {
      url: 'audio4',
      response: [],
      perc:0
    },
    {
      url: 'audio5',
      response: [],
      perc:0
    },
    {
      url: 'audio6',
      response: [],
      perc:0
    }
  ];

})

.controller('TestCtrl', function($scope, $modal) {
  $scope.phase = 0;
  $scope.test1Complete = false;
      
  $scope.order= [];
  $scope.trialphase = 0;
  $scope.total = 35;
  $scope.started = false;
  $scope.responded = false;
  
  
  $scope.feedback;
  
  if($scope.phase==0 && $scope.trialphase < $scope.total){
    $scope.$watch('spaceCount', function() {
      if($scope.currentPage==1 && $scope.trialphase==0)
      {
        $scope.started = true;
        $scope.reorder();
        $scope.updateHeader(1);
        $scope.safeApply();
        $scope.progress();
      }
    });
  }
  
  
  $scope.prevPhase= function(header, check){
    if($scope.trialphase == 35 && check)
    {
      $scope.$broadcast("SHOW_WARNING",['prev']);
    }else
    {
      $scope.phase--;
      $scope.updateHeader(header);
      if($scope.trialphase >= 35 || $scope.trialphase<=0)
      {
        $scope.trialphase = 0;
        $scope.setFinish(false);
        for(var i=0; i< $scope.audioFiles.length;i++)
        {
          $scope.audioFiles[i].response = [];
          $scope.audioFiles[i].perc = 0;
        } 
      }
      $scope.safeApply();
    }
  }
  
  
  $scope.reorder = function() {
    var seven = [0,1,2,3,4,5,6];
    for(var i=0; i<5; i++ )
    {
      for(var j=0; j<seven.length; j++)
      {
        $scope.order.push(seven[j]);
      }
    }
    $scope.shuffle($scope.order);
  }
  
  $scope.shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
      return v;
  }
  
  $scope.record = function(sound) {
    $scope.audioFiles[$scope.order[$scope.trialphase-1]].response.push(sound);
    $scope.responded = true;
    if(($scope.trialphase) >= $scope.total)
    {
      $scope.phase++;
      $scope.updateHeader(2);
      $scope.test1Complete = true;
      for(var i=0; i<$scope.audioFiles.length; i++ )
      {
        $scope.count=0;
        for(var j=0; j<$scope.audioFiles[i].response.length; j++)
        {
          if($scope.audioFiles[i].response[j] == 'buh')
          {
            $scope.count++;
          }
        }
        $scope.audioFiles[i].perc = (($scope.count/5) * 100);
        //console.log('PERC: ' + $scope.audioFiles[i].perc);
      }
      $scope.drawGraph();
    }
    $scope.safeApply();
  }
  
  $scope.drawGraph = function() {
    $scope.feedbackoptions= [
    "Your phonemic boundary might differ significantly from the expected boundary, because the expected boundary was derived from the results of a large number of trials across multiple participants.",
    [
    "Your responses indicate that, regardless of voice onset time, you tended to perceive each of the stimuli as “buh.” Since you perceived all the stimuli as the same syllable, there is no phonemic boundary to depict, and you didn’t show any categorical perception based on voice onset time. You may want to go back and repeat the trials to see if you get a different result.",
    "Your responses indicate that, regardless of voice onset time, you tended to perceive each of the stimuli as “puh.” Since you perceived all the stimuli as the same syllable, there is no phonemic boundary to depict, and you didn’t show any categorical perception based on voice onset time. You may want to go back and repeat the trials to see if you get a different result."
    ],
    "Your responses indicate that your perception of “buh” vs. “puh” didn’t depend on voice onset time in a systematic way, because your perception tended to switch between the two syllables at more than one voice onset time (dashed red lines). Thus, you had no unique phonemic boundary to depict. You may want to go back and repeat the trials to see if you get a different result."
  ];
    var response = [$scope.audioFiles[0].perc,$scope.audioFiles[1].perc,$scope.audioFiles[2].perc,$scope.audioFiles[3].perc,$scope.audioFiles[4].perc,$scope.audioFiles[5].perc,$scope.audioFiles[6].perc];
    var myplotlines = [{ // summer months - treat from/to as numbers
          color: '#000000',
          width: 2,
          value: 2.68,
          id: 'plotline-1',
          dashStyle: 'ShortDash',
          label: {
            verticalAlign: 'middle',
            textAlign: 'center',
            text: 'Expected phonemic boundary, 26.8 msec' 
          },
          zIndex: 2
        }]
    for(var i=1; i<response.length; i++)
    {
      if((response[i]<50 && response[i-1] > 50) || (response[i]>50 && response[i-1]<50))
      {
        //console.log(response[i], response[i-1]);
        var interesection
        if(response[i]>50)
        {
          interesection = ( ( response[i]-50 )/( response[i]-response[i-1] ) ) 
        }else
        {
          interesection = ( ( 50 - response[i] )/( response[i-1]-response[i] ) ) 
        }
        myplotlines.push(
         { color: '#ff0000',
          width: 2,
          value: i - interesection,
          id: 'plotline-1',
          dashStyle: 'ShortDash',
          zIndex: 2,
          label: {
          verticalAlign: 'middle',
          textAlign: 'center', }
          }
          );
      }
    }
    
    if(myplotlines.length > 2) //multiple crosses
    {
      $scope.feedback = $scope.feedbackoptions[2];
    }else if(myplotlines.length == 2) // one cross
    {
      $scope.feedback = $scope.feedbackoptions[0];
    }else //no crosses
    { 
      if(response[0]>50)
      {
        $scope.feedback = $scope.feedbackoptions[1][0];
      }else
      {
        $scope.feedback = $scope.feedbackoptions[1][1];
      }
      
    }
    $scope.safeApply();
    $('#container').highcharts({
      chart: {
        type: 'line'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      legend: {
        enabled: false
      },
      yAxis: [{
      
        lineColor: '#000000',
        lineWidth: 1,
        title: {
          text: '"buh" responses (%)',
          style: {
            color: 'black'
          }
        },
        max: 100,
        min: 0,
        plotLines: [
          {
            color: '#cccccc',
            value: 50,
            width: 5,
            zIndex: 1
          }
        ]
      },{
        lineColor: '#000000',
        lineWidth: 1,
        title: {
          text: '"puh" responses (%)',
          style: {
            color: 'black'
          }
        },
        opposite: true,
        max: 100,
        min: 0,
        reversed: true
      }],
      tooltip: {
        enabled: false,
        formatter: function() {
          return '<b>'+ this.series.name +'</b><br/>'+
            this.x +': '+ this.y +'°C';
        }
      },
      xAxis: {
        lineColor: '#000000',
        lineWidth: 1,
        categories: ['0', '10', '20', '30', '40', '50', '60'],
        plotLines: myplotlines,
        title: {
          text: "Voice onset time (msec)",
          style: {
            color: 'black'
          }
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        data: response,
        color: '#FF0000'
      }]
    });
  }
  
  $scope.progress = function() {
    $scope.responded = false;
    $scope.selectedAudioFile =  $scope.audioFiles[$scope.order[$scope.trialphase]].url;
    $scope.trialphase++;
    $scope.playing = false;
    $scope.audio = document.getElementById($scope.selectedAudioFile);
    $scope.audio.play();
    $scope.safeApply();
  }
  
   //open modal
  $scope.openModalTest = function (template) {
    var modalInstance = $modal.open({
      templateUrl: template,
      controller: ModalInstanceCtrl,
      resolve: {
        userFeedback: function () {
          return $scope.userFeedback;
        }
      }
    });

    modalInstance.result.then(function () {
      if(template == 'warningModal.html')
      {
        $scope.phase++;
        $scope.updateHeader(2);
      }else
      {
        $scope.prevPhase(1);
      }
    }, function () {
      //$scope.questionsControl('prev');
    });
  };
  $scope.$on("SHOW_WARNING", function(event, data){
    if(data[0] == 'next')
    {
      if($scope.trialphase==35)
      {
        $scope.phase++;
        $scope.updateHeader(2);
      }else{
        $scope.openModalTest('warningModal.html');
      }  
    }else if(data[0] == 'prev')
    {
      $scope.openModalTest('warningBackModal.html');
    }
  });
})

//Modal instance controller
var ModalInstanceCtrl = function ($scope, $modalInstance, userFeedback) {
  $scope.copy = userFeedback;
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}


