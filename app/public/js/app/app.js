(function () { // Wrap in function to prevent accidental globals
    
    
    ko.bindingHandlers.editableText = {
        init: function(element, valueAccessor) {
            var $element = $(element)
            $element.attr('contenteditable',true).addClass('ko-editableText')
            var initialValue = ko.utils.unwrapObservable(valueAccessor())
            $element.text(initialValue)
            $element.on('blur', function() {
                
                var observable = valueAccessor();
                observable($(this).text())
                
            });
        },
        update: function(element, valueAccessor) {
            var initialValue = ko.utils.unwrapObservable(valueAccessor())
            var $element = $(element)
            $element.text(initialValue)
        }
    };
    
    
    var postbox = new ko.subscribable();
    
    
    
    var boardsListViewModel = function() {
        var self = this
        self.boards = ko.observableArray()
        self.selected = ko.observable('') //board
        
        self.getBoards = function(callback) {
            $.getJSON('/api/v1/boards/',function(data){
                self.boards(data)
                if(typeof(callback) != undefined) callback()
            })
        };
        
        self.goToBoard = function(board){
            self.selected(board._id)
            postbox.notifySubscribers(board._id, "selectedBoard");
        };
        
        self.getBoards(function(){
            self.goToBoard(self.boards()[0])
        })
        
        postbox.subscribe(function(boardUpdate){
            var b = self.boards()
            for(i=0;i<b.length;i++) {
                if(b[i]._id == boardUpdate.id()) {
                    b[i].name = boardUpdate.title()
                    b[i].description = boardUpdate.description()
                }
            }
            self.boards([])
            self.boards(b)
            
        }, self, "updatedBoard");
    }
    

    ko.applyBindings(boardsListViewModel, document.getElementById('boardsList'))
    
    

    var boardViewModel = function() {
        var self = this
        self.id = ko.observable()
        self.title = ko.observable()
        self.description = ko.observable()

        self.load = function(boardId) {
            $.getJSON('/api/v1/boards/'+boardId,function(data) {
                self.id(data._id)
                self.title(data.name)
                self.description(data.description || '')
            })  
        }
        
        self.save = function() {
            $.ajax({
                url:'/api/v1/boards/'+self.id(),
                type:'PUT',
                data:{
                    name:self.title(),
                    description:self.description()
                }
            })
            postbox.notifySubscribers(self, "updatedBoard");
        }

        postbox.subscribe(self.load, self, "selectedBoard");
    };

    ko.applyBindings(boardViewModel(), document.getElementById('board'))
   
})();