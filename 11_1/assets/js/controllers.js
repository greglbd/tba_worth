'use_strict';

angular.module('app.controllers', [])
.controller('PageCtrl', function($scope){
  //Variables
  $scope.activity_title = "Categorical Perceptions Based on Voice Onset Time"
  $scope.currentPage = 0;
  $scope.finished = false;
  $scope.questions = false;
  $scope.pageCopy = [
    {
      copy: [
        { line: "In this demonstation you'll be a participant in a simulated experiment demonstrating categorical perception of the phonemes /p/ and /b/" },
        { line: "There will be a total of 35 trials. In each trial" },
        { line: "1. You'll hear a single spoken syllable \"puh\" or \"buh\"" },
        { line: "2. Click puh or buh to indicate which syllable you perceived" },
        { line: "3. Press the space bar to start the next trial" }
      ]
    },
    {
      copy: [
        { line: "Click PUH or BUH to indicate which syllable you perceived." }
      ]
    },
    {
      copy: [
        { line: "Results" },
        { line: "The syllables you heard in this experiment were synthesized. All the initial consonants were identical and all the final vowels were identical, but the voice onset times varied. You heard 5 occurrences each of syllables with voice onset times of 0, 10, 20, 30, 40, 50, and 60 msec. The 7 data points in the graph below show the percentages of your “puh” and “buh” responses for each of these stimuli. The expected phonemic boundary between perception of the phoneme /b/ (in “buh”) and the phoneme /p/ (in “puh”) is the boundary at 26.8 msec, derived from the results of an actual experiment with these stimuli." },
        { line: "Categorical perception of /b/ vs. /p/ is revealed by a sharp transition from perceiving “buh” to perceiving “puh”—that is, a transition from a high percentage of “buh” responses to a high percentage of “puh” responses across a narrow range of voice onset times. If your results show such a transition, then you experienced an abrupt shift in perception between the two phonemes." }
      ]
    },
    {
      copy: [
        { line: "Now try another trial. Click PLAY to present the stimuli. Remember:" },
        { line: "BE SURE THAT YOU ATTEND TO THE MIDDLE STREAM ONLY, SO YOU DON'T MISS ANY OF THE WORDS IN IT."  },
        { line: "When you feel confident that you have carried out this task successfully, click FINISHED."  }
      ]
    },
    {
      copy: [
        { line: "In this trial, the top and bottom streams contained some emotionally charged words. Did you notice any of them?" },
        { line: "Click REPLAY to try again—still attending to the middle stream—and see if you notice these words."  },
        { line: "Click SHOW THE STIMULI to see the streams in full."  }
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
  
  //change page
  $scope.change= function($targetPage, $window) {
    if($window)
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
    else if (!$window)
    {
      $scope.currentPage = $targetPage;
    }
    
    if($scope.currentPage == 4)
    {
      $scope.questions = true;
    }
  }
  
  //test finished
  $scope.setFinish = function(b){
    $scope.finished = b;
  }
  
  //next page
  $scope.nextPage= function(){
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
      url: 'assets/audio/bp00.mp4',
      response: [],
      perc:20
    },
    {
      url: 'assets/audio/bp10.mp4',
      response: [],
      perc:20
    },
    {
      url: 'assets/audio/bp20.mp4',
      response: [],
      perc:0
    },
    {
      url: 'assets/audio/bp30.mp4',
      response: [],
      perc:40
    },
    {
      url: 'assets/audio/bp40.mp4',
      response: [],
      perc:60
    },
    {
      url: 'assets/audio/bp50.mp4',
      response: [],
      perc:80
    },
    {
      url: 'assets/audio/bp60.mp4',
      response: [],
      perc:100
    }
  ];

})

.controller('TestCtrl', function($scope) {
  $scope.phase = 0;
  $scope.test1Complete = false;
      
  $scope.order= [];
  $scope.trialphase = 0;
  $scope.total = 35;
  $scope.started = false;
  $scope.responded = false;
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
  
  $scope.reorder = function() {
    var seven = [0,1,2,3,4,5,6];
    for(var i=0; i<8; i++ )
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
        
      }
      console.log($scope.audioFiles);
    }
    $scope.safeApply();
  }
  
  $scope.progress = function() {
    $scope.responded = false;
    $scope.selectedAudioFile =  $scope.audioFiles[$scope.order[$scope.trialphase]].url;
    console.log($scope.selectedAudioFile);
    $scope.trialphase++;
    console.log($scope.trialphase);
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = $scope.selectedAudioFile;
    $scope.audio.play();
    $scope.safeApply();
  }
})

.controller('TrialCtrlTwo', function($scope){
  $scope.trialphase = 0;
  $scope.total = 32;
  $scope.started = false;
  $scope.responded = false;
  $scope.phase=3;
  $scope.updateHeader(3);
  $scope.safeApply();


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


