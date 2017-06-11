@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">            
                <?php $logged = Auth::check() ? '1': '0'; ?>                
                <div id ='root' data-logged="{{$logged}}"></div>            
        </div>
    </div>
</div>
@endsection
