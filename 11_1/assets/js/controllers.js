'use_strict';

angular.module('app.controllers', [])
.controller('PageCtrl', function($scope){
  //Variables
  $scope.activity_title = "Categorical Perceptions Based on Voice Onset Time"
  $scope.currentPage = 0
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
    
    if($scope.currentPage == 3)
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
})

.controller('TestCtrl', function($scope) {
  $scope.phase = 0;
  $scope.audioFiles =[
        {url: 'assets/audio/bp10.mp4'},
        {url: 'assets/audio/bp20.mp4'},
        {url: 'assets/audio/bp30.mp4'},
        {url: 'assets/audio/bp40.mp4'},
        {url: 'assets/audio/bp50.mp4'},
        {url: 'assets/audio/bp60.mp4'}
    ];
    
  $scope.order= [];
  //Controller for actual test
  if($scope.phase==1){
    $scope.$watch('spaceCount', function() {
      if($scope.currentPage==1)
      {
        $scope.phase++;
        $scope.safeApply();
      }
    });
  }
 
  
})

.controller('TrialCtrl', function($scope) {
  $scope.trialphase = 0;
  $scope.total = 48;
  if($scope.phase==0){
    $scope.$watch('spaceCount', function() {
      if($scope.currentPage==1)
      {
        if($scope.trialphase==0)
        {
          $scope.reorder();
        }
        $scope.trialphase++;
        $scope.updateHeader($scope.trialphase);
        $scope.selectedAudioFile =  $scope.audioFiles[$scope.trialphase].url;
        $scope.safeApply();
        
        $scope.playing = false;
        $scope.audio = document.createElement('audio');
        $scope.audio.src = $scope.selectedAudioFile;
        console.log($scope.audio.src);
        $scope.audio.play();
      }
    });
  }
  
  $scope.reorder = function() {
    var six = [0,1,2,3,4,5];
    for(var i=0; i<8; i++ )
    {
      for(var j=0; j<six.length; j++)
      {
        $scope.order.push(six[j]);
      }
    }
    $scope.shuffle($scope.order);
  }
  
  $scope.shuffle = function(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
      return v;
  }
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


