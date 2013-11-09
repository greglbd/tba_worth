'use_strict';

angular.module('app.controllers', [])
.controller('PageCtrl', function($scope){
  //Variables
  $scope.activity_title = "Neurons and Neural Communication"
  $scope.currentPage = 0
  $scope.finished = false;
  $scope.questions = false;
  $scope.pageCopy = [
    {
      copy: [
        { line: "In this demonstration, you’ll be a participant in a visual search experiment. On each trial, you’ll view a display containing red or blue rectangles oriented either vertically or horizontally. Here’s a sample display:" }
      ]
    },
    {
      copy: [
        { line: "Did you notice anything in the top and bottom streams?" },
        { line: "Experiments like this are typically carried out with auditory stimuli (streams of spoken words), not visual stimuli. And typically, participants notice very little in the unattended streams."  },
        { line: "In this case, some of the words in the unattended streams were words from a foreign language, words from a nursery rhyme, or not even words at all. Click REPLAY to see how easy it is to notice these features if you aren't attending elsewhere and how difficult it is if you're attending to the middle stream. Click SHOW THE STIMULI to see the streams in full."  }
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
  $scope.setfocus;
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
  if($scope.phase==0){
    $scope.$watch('spaceCount', function() {
      if($scope.currentPage==1)
      {
        
        $scope.trialphase++;
        $scope.safeApply();
        console.log('trial : ' +  $scope.trialphase);
        if($scope.trialphase==2)
        {
          $scope.setfocus = true;
          setTimeout(function() {
            console.log('hello')
            $scope.setfocus = false;
            $scope.safeApply();
          }, 1000);
        }
      }
    });
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


