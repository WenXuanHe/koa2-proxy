<?php
    header("ALLOW-CONTROL-ALLOW-ORIGIN:*");
    header("Content-type':text/html;charset=utf-8");
    class ConnectSQL{
        ////protected，当前类和子类都可以访问，如设置为private，则子类不能访问
        protected $dbName;
        protected $tbName;

        function __construct($dbName, $tbName){
            $this->dbName = $dbName;
            $this->tbName = $tbName;
        }

        public function Open_mysql($sql){
            $con = mysql_connect('localhost', 'root', '');
            mysql_select_db($this->dbName, $con);
            mysql_query("set names 'utf8'");
            $result = mysql_query($sql, $con);
            return $result;
        }

         public function query($needSelect, $condition){
            $need = implode(",",$needSelect);
            $sql = "SELECT ".$need." FROM ".$this->tbName." WHERE ".$condition;
            $result = $this->Open_mysql($sql);
            $array = array();
            while($row=mysql_fetch_array($result)){
                $item = array();
                foreach ($needSelect as $value) {
                    $item[$value] = $row[$value];
                }
                array_push($array, $item);
            }
            return $array;
         }
    }

    class AddThumb extends ConnectSQL{

        function __construct($dbName, $tbName){
            parent::__construct($dbName, $tbName);
        }

        public function QueryByID($id){
            $result = parent::query(['id', 'number'], 'id='.$id);
            $res = null;
            if(count($result) > 0){
                $res = $result[0];
            }
            return $res;
        }

        public function AddByOne($id, $res){
            $number = $res['number'] + 1;
            $sql = "UPDATE ".$this->tbName." SET number=".$number." WHERE id =".$id;
            parent::Open_mysql($sql);
            $res['number'] = $number;
            return $res;
        }

        public function Add($id){
            $res = $this->QueryByID($id);
            if($res != null){
                $res = $this->AddByOne($id, $res);
            }
            return $res;
        }

        public function queryAllMember(){
            $result = parent::query(['id', 'name', 'number'], '1');
            return $result;
        }
    }

    //代理过来的数据
    $id = $_REQUEST['id'];
    $addThumb = new AddThumb("phptest", "thumb");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $result = $addThumb->Add($id);
    }else{
        $result = $addThumb->queryAllMember();
    }
    echo json_encode($result);
 ?>
